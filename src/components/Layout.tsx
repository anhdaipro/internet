import React  from "react"
type Props = {
    children: JSX.Element,
  };
  const Layout = ({ children }: Props) => (
    <>
      {children}
    </>
  );
export default Layout