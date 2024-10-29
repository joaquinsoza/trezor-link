// PasswordSetup.tsx
import React, { useState } from "react";
import { FlexColumn, PasswordInput } from "../../components/Common";
import { BaseButton } from "../../components/BaseButton";

const PasswordSetup = ({
  onPasswordSet,
}: {
  onPasswordSet: (password: string) => void;
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password === confirmPassword) {
      onPasswordSet(password);
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <FlexColumn color="white">
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          marginBottom: "4rem",
        }}
      />
      <PasswordInput
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordInput
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <BaseButton width="85%" size="md" onClick={handleSubmit}>
        Save Password
      </BaseButton>
    </FlexColumn>
  );
};

export default PasswordSetup;
