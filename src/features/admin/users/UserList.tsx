import * as React from "react";
import MUIDatatable from "mui-datatables";
import User from "../../../shared/models/UserModel";

interface IUserListProps {
  data: User[];
  title: string;
  columns: any[];
}

const UserList: React.FunctionComponent<IUserListProps> = ({
  data,
  title,
  columns,
}) => {
  return (
    <>
      <MUIDatatable title={title} columns={columns} data={data} />
    </>
  );
};

export default UserList;
