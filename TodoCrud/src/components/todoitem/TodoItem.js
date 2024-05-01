export default function TodoItem({ itemName, itemKey }) {
  let key = "item_key_" + itemKey;
  let redirectUrl = "/todoItem/" + itemKey;
  console.log(redirectUrl);
  return (
    <div className="todoItemDiv">
      <hr />
      <a href={redirectUrl}>
        <li key={key} className="todoItem">
          {itemName}
        </li>
      </a>
    </div>
  );
}
