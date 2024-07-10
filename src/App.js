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
  const [showFriendForm, setShowFriendForm] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [friendsData, setFriendsData] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend() {
    setShowFriendForm((show) => !show);
  }

  function handleSetFriendsData(newFriend) {
    setFriendsData([...friendsData, newFriend]);
  }

  // function handleSelect(friend) {
  //   setSelectedFriend(selectedFriend == null ? friend : null);
  // }

  function handleSelect(friend) {
    setSelectedFriend((prevSelected) =>
      prevSelected?.id === friend.id ? null : friend
    );
  }

  function handleSplitBill(value) {
    setFriendsData((friendsData) =>
      friendsData.map((friend) =>
        friend.id === selectedFriend.id
          ? {
              ...friend,
              balance: friend.balance + value,
            }
          : friend
      )
    );
    // setSelectedFriend(null);
  }

  return (
    <div className="App">
      <FriendList friends={friendsData} onSelect={handleSelect} />
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
      {selectedFriend != null && (
        <BillForm selectedFriend={selectedFriend} onSplit={handleSplitBill} />
      )}
    </div>
  );
}

function FriendList({ friends, onSelect }) {
  return (
    <div className="friend-list">
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelect }) {
  return (
    <div>
      <p>{friend.name}</p>
      <p>{friend.image}</p>
      {friend.balance < 0 && (
        <p>
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p>
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}

      <button onClick={() => onSelect(friend)}>Select</button>
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

function BillForm({ selectedFriend, onSplit }) {
  const [billValue, setBillValue] = useState(null);
  const [yourExpense, setYourExpense] = useState(null);
  const [whoPay, setWhoPay] = useState("You");

  function handleSubmit(e) {
    let friendExpense = billValue - yourExpense;
    let value = yourExpense - friendExpense;
    e.preventDefault();
    onSplit(value);
  }

  return (
    <div className="bill">
      <form onSubmit={handleSubmit}>
        <h3>Split a bill with {selectedFriend.name}</h3>
        <label>Bill Value: </label>
        <input
          type="text"
          placeholder="Enter bill value..."
          value={billValue}
          onChange={(e) => setBillValue(e.target.value)}
        />

        <label>Your Expense: </label>
        <input
          type="text"
          placeholder="Enter your expense..."
          value={yourExpense}
          onChange={(e) => setYourExpense(e.target.value)}
        />
        <p></p>
        <label>{selectedFriend.name} expense: </label>
        <input type="text" disabled />

        <label>Who is paying the bill? </label>
        <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
          <option value="You">You</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
        <p></p>
        <button type="submit">Split Bill</button>
      </form>
    </div>
  );
}

export default App;
