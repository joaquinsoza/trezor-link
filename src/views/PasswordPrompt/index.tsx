// PasswordPrompt.tsx
import React, { useState } from "react";
import { FlexColumn, PasswordInput } from "../../components/Common";
import { BaseButton } from "../../components/BaseButton";

const PasswordPrompt = ({
  onPasswordEntered,
}: {
  onPasswordEntered: (password: string) => void;
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onPasswordEntered(password);
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
      <BaseButton width="85%" size="md" onClick={handleSubmit}>
        Unlock
      </BaseButton>
    </FlexColumn>
  );
};

export default PasswordPrompt;
