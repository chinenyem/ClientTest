import styled from "@emotion/styled";
import { FC } from "react";

type Props = {
  text: string;
  click?: () => void;
};

const CoreButton: FC<Props> = (props) => {
  return (
    <Styled>
      <div onClick={props.click}>{props.text}</div>
    </Styled>
  );
};

const Styled = styled.div`
  cursor: pointer;
  display: inline-block;
  background-color: #61dafb;
  color: #0c323c;
  padding: 5px 8px 7px 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1.1em;
`;
export default CoreButton;
