import { useState } from "react";
import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [showBill, setShowBill] = useState(false);
  const [showFriendForm, setShowFriendForm] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [friendsData, setFriendsData] = useState(initialFriends);

  function handleAddFriend() {
    setShowFriendForm(!showFriendForm);
  }

  function handleSetFriendsData(newFriend) {
    setFriendsData([...friendsData, newFriend]);
  }

  return (
    <div className="App">
      <FriendList friends={friendsData} />
      <AddFriend onAddFriend={handleAddFriend} />
      {showFriendForm && (
        <FriendForm
          name={name}
          onEnterName={setName}
          image={image}
          onEnterUrl={setImage}
          onConfirmAdd={handleSetFriendsData}
          onSetShowFriendForm={setShowFriendForm}
        />
      )}
      <SplitBill />
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <div className="friend-list">
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <div>
      <p>{friend.name}</p>
      <p>{friend.image}</p>
      <button>Select</button>
    </div>
  );
}

function AddFriend({ onAddFriend }) {
  return (
    <div className="add-friend">
      <button onClick={onAddFriend}>Add Friend</button>
    </div>
  );
}

function FriendForm({
  name,
  onEnterName,
  image,
  onEnterUrl,
  onConfirmAdd,
  onSetShowFriendForm,
}) {
  const id = crypto.randomUUID();

  const newFriend = { name, image, id };
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmAdd(newFriend);
    onEnterName("");
    onEnterUrl("");
    onSetShowFriendForm(false);
  }

  return (
    <div className="friend-form">
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => onEnterName(e.target.value)}
          />
          <label>URL: </label>
          <input
            type="text"
            placeholder="Enter Url..."
            value={image}
            onChange={(e) => onEnterUrl(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
function SplitBill() {
  return <div className="bill">BILL</div>;
}

export default App;
