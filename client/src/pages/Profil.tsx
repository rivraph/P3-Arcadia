import { useState } from "react";
import "../styles/Profil.css";

function Profil() {
  const [edit, setEdit] = useState(false);

  const toggleSwitch = () => {
    setEdit(!edit);
  };

  const handleEditClick = () => {
    toggleSwitch();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      console.info("bouton édition appuyé");
    }
  };

  return (
    <>
      <h1 id="profiltitle">Profil</h1>
      <div className="profil">
        <form className="profilform">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            readOnly={!edit}
            required
          />

          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            readOnly={!edit}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            readOnly={!edit}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            readOnly={!edit}
            required
          />

          <label htmlFor="number">Number</label>
          <input
            type="text"
            id="number"
            name="number"
            readOnly={!edit}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            readOnly={!edit}
            required
          />

          <label htmlFor="zipcode">ZipCode</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            readOnly={!edit}
            required
          />

          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" readOnly={!edit} required />

          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            readOnly={!edit}
            required
          />

          <label htmlFor="birthday">Birthday</label>
          <input
            type="text"
            id="birthday"
            name="birthday"
            readOnly={!edit}
            required
          />

          <label htmlFor="registrationdate">Registraton date</label>
          <input
            type="text"
            id="registrationdate"
            name="registrationdate"
            readOnly={!edit}
            required
          />

          <label htmlFor="role">Role</label>
          <input type="text" id="role" name="rolee" readOnly={!edit} required />
        </form>

        <div className="toggle-button">
          <button
            type="button"
            onClick={handleEditClick}
            onKeyDown={handleKeyPress}
            aria-label="Toggle edit mode"
          >
            {edit ? "✅" : "🖌"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Profil;
