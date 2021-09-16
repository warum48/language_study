import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons";

const Infohead = (props) => {
  return (
    <div className="infohead">
      <h3>{props.text}</h3>
      {/*<button onClick={setToggleExpandHelp}>expand</button>*/}
      <div className="icon">
        <IconContext.Provider
          value={{ color: "white", className: "global-class-name" }}
        >
          <AiFillCaretDown onClick={props.clickfunc} />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Infohead;
