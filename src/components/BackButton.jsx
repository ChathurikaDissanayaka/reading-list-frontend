import { Link } from "react-router-dom";
import { LuArrowLeftSquare } from "react-icons/lu";
import { Button } from "../components/ui/button";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link to={destination}>
        <Button size="sm" variant="outline" marginLeft="3">
          <LuArrowLeftSquare />
        </Button>
      </Link>
    </div>
  );
};

export default BackButton;
