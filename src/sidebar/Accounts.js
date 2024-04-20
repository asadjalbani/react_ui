import React from "react";
import AddAccountWithToken from "../AddAccountWithToken";
import AddAccountWithBatchTokens from "../AddAccountsWithBatchTokens";
import AddAccountWithNumber from "../AddAccountWithNumber";

function Accounts() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: 20,
      }}
    >
      <AddAccountWithToken />
      <AddAccountWithBatchTokens />
      <AddAccountWithNumber />
    </div>
  );
}

export default Accounts;
