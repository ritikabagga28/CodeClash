import ProblemForm from "../components/ProblemForm";
import { useApp } from "../context/AppContext";
import "./CreateProblem.css";

export default function CreateProblem() {
  const { addCustomChallenge } = useApp();

  return (
    <div className="page create-problem-page">
      <div>
        <h1>Create a problem</h1>
        <p>
          Build a custom Java challenge. It's stored locally for this prototype and shows up
          on the Challenges page right away.
        </p>
      </div>

      <ProblemForm onCreate={addCustomChallenge} />
    </div>
  );
}
