import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";
import User from "../../../shared/models/UserModel";
import UserList from "./UserList";
import Swal from "sweetalert2";
interface IUsersProps {}

const Users: React.FunctionComponent<IUsersProps> = (props) => {
  const { pathname } = useLocation();
  const [users, setUsers] = React.useState<User[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    UserService.fetchAllUser(
      `?role=${pathname.includes("users") ? "admin" : "customer"}`
    )
      .then((response) => {
        setUsers(response?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure to delete user ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UserService.deleteUser(id)
          .then((response) => {
            loadUsers();
            Swal.fire("Deleted!", "User has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            const message = err?.response?.data?.message || "Could not delete";
            Swal.fire("Deleted!", message, "error");
          });
      }
    });
  };

  // addnew user
  const handleAddUser = (role: string) => {
    navigate(`/secured/add-edit/0/add/${role}`);
  };
  //edituser
  const handleEditUser = (id: string, role: string) => {
    if (id && role) navigate(`/secured/add-edit/${id}/edit/${role}`);
  };

  const commonColumns = [
    {
      label: "ID",
      name: "userId",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Name",
      name: "name",
      options: {
        sort: true,
        filter: false,
        customBodyRenderLite: (index: number) => {
          const user = users[index];
          return `${user?.name?.first} ${user?.name?.last}`;
        },
      },
    },
    {
      label: "Mobile",
      name: "mobile",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Action",
      name: "action",
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index: number) => {
          const user = users[index];
          return (
            <>
              <IconButton
                color="primary"
                onClick={() =>
                  handleEditUser(user?._id as string, user?.role || "")
                }
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(user?._id as string)}
              >
                <Delete />
              </IconButton>
            </>
          );
        },
      },
    },
  ];
  const userColumns = [...commonColumns];
  const customerColumns = [...commonColumns];

  return (
    <>
      <Button
      sx={{mb:2}}
        variant="contained"
        onClick={() =>
          handleAddUser(pathname.includes("users") ? "admin" : "customer")
        }
      >
        Add User
      </Button>
      <UserList
        title={pathname.includes("users") ? "User List" : "Customer List"}
        data={users}
        columns={pathname.includes("users") ? userColumns : customerColumns}
      />
    </>
  );
};

export default Users;
