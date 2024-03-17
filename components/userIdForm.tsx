import React from "react";

const UserIdForm = ({ onSubmit }:any) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const form_values = Object.fromEntries(formData);
    const userIdString = form_values.userId.toString();
    onSubmit(userIdString);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userId">User ID:</label>
      <input type="text" id="userId" name="userId" required />
      <button type="submit">Fetch Data</button>
    </form>
  );
};

export default UserIdForm;