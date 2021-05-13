/** @jsx jsx */
import { jsx } from "theme-ui";
import { FC, memo } from "react";
import { PersonInterface } from "../services/person";
import { Link } from "react-router-dom";

type Props = {
  person: PersonInterface;
  firePerson: (id: string) => void;
};

const getBg = (person: PersonInterface) => {
  if (person.gender === 0) {
    return "rgb(200, 200, 255)";
  }

  if (person.gender === 1) {
    return "rgb(255, 200, 200)";
  }

  return "rgb(200, 200, 200)";
};

const Person: FC<Props> = ({ person, firePerson }) => {
  return (
    <div
      sx={{
        border: "10px solid rgb(0, 0, 0)",
        borderRadius: "10px",
        padding: "1em",
        margin: "1em 0",
        backgroundColor: getBg(person)
      }}
    >
      <div>
        <Link to={`/person/${person.id}`}>
          <strong>{person.lastName}</strong>, {person.firstName}
        </Link>
      </div>
      <div>
        <button
          disabled={person.isBeingFired}
          onClick={() => {
            firePerson(person.id);
          }}
        >
          Vapauta
        </button>
      </div>
    </div>
  );
};

export default memo(Person);
