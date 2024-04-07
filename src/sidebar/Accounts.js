import React, { useState, useEffect } from 'react';
import AddAccountWithToken from '../AddAccountWithToken';
import AddAccountWithBatchTokens from '../AddAccountsWithBatchTokens';
import AddAccountWithNumber from '../AddAccountWithNumber';

function Accounts() {
  return (
    <div>
      <AddAccountWithToken />
      <AddAccountWithBatchTokens />
      <AddAccountWithNumber />
    </div>
  );
}

export default Accounts;
