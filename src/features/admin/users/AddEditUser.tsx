import * as React from "react";
import UserForm from "./UserForm";

import { useParams } from "react-router-dom";
import User from "../../../shared/models/UserModel";
import UserService from "../../../services/UserService";
interface IAddEditUserProps {}

const AddEditUser: React.FunctionComponent<IAddEditUserProps> = (props) => {
  const { id, op, role } = useParams();

  const [currentuser, setCurrentuser] = React.useState<User>({});
  const loadOneUser = () => {
    UserService.fetchOneUser(id as string)
      .then((response) => {
        setCurrentuser(response?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  React.useEffect(() => {
    if (op == "edit") {
      loadOneUser();
    }
  }, [id]);
  return (
    <>
      <h2>{op == "edit" ? "Edit" : "Create"} User</h2>
      <UserForm
        type={op == "edit" ? "edit" : "add"}
        initialUser={currentuser}
        role={role as string}
      />
    </>
  );
};

export default AddEditUser;
