import { ReactNode } from "react";
import { Alert } from "react-bootstrap";

const Message = ({
  variant,
  children,
}: {
  variant: string;
  children: ReactNode;
}) => {
  return <Alert variant={variant}>{children}</Alert>;
};
Message.defaultProps = {
  variant: "info",
};
export default Message;
