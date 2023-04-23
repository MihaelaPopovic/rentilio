import "./AdminDashboard.scss";
import VehicleBrands from "./../../components/vehicle-brands/VehicleBrands"

const AdminDashboard = () => {
 /*  const handleSubmit = async (e) => {
    e.preventDefault();
   const collectionRef = collection(database, "users");
    addDoc(collectionRef, {
      email: 'test@gmail.com',
      name: 'test',
      password: '123'
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      }); 

  }; */
  return (
    <div className="wrapper">
      <VehicleBrands />
 
    </div>
  );
};

export default AdminDashboard;
