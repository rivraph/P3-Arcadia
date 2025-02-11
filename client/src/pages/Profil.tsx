import "../styles/Profil.css";
import { useContextProvider } from "../components/context/ArcadiaContext";

function Profil() {
  const {
    userData,
    setUserData,
    userId,
    handleKeyPress,
    handleEditClick,
    edit,
  } = useContextProvider();

  // fonction pour supprimer le compte
  const handleRemove = async (event: React.MouseEvent) => {
    event.preventDefault();

    const confirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ?",
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          method: "delete",
        },
      );
      if (response.ok) {
        console.info("User deleted");
        window.location.href = "/";
      } else {
        console.error("Error deleting user:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="mainprofil">
      <div className="profil">
        <h1 id="profiltitle">{userData.firstname}'s profile</h1>
        <form className="profilform">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            readOnly={!edit}
            value={userData.firstname}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            readOnly={!edit}
            value={userData.lastname}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            readOnly={!edit}
            value={userData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            readOnly={!edit}
            value={userData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="number">Number</label>
          <input
            type="text"
            id="number"
            name="number"
            readOnly={!edit}
            value={userData.tel_num}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            readOnly={!edit}
            value={userData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="zipcode">ZipCode</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            readOnly={!edit}
            value={userData.zipcode}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            readOnly={!edit}
            value={userData.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            readOnly={!edit}
            value={userData.country}
            onChange={handleChange}
            required
          />

          <label htmlFor="birthday">Birthday</label>
          <input
            type="text"
            id="birthday"
            name="birthday"
            readOnly={!edit}
            value={userData.birthdate}
            onChange={handleChange}
            required
          />

          <label htmlFor="registrationdate">Registraton date</label>
          <input
            type="text"
            id="registrationdate"
            name="registrationdate"
            readOnly={!edit}
            value={userData.registration_date}
            required
          />

          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            readOnly={!edit}
            value={userData.role}
            required
          />
          <button
            type="submit"
            onClick={handleRemove}
            onKeyDown={handleKeyPress}
          >
            Remove account
          </button>
        </form>
      </div>
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
  );
}

export default Profil;
