export default function PetList(props) {
    return (
      <div>
        <p>ID: {props.id}</p>
        <p>Name: {props.name}</p>
        <p>Species: {props.species}</p>
        <p>Owner ID: {props.ownerId}</p>
      </div>
    )
  }