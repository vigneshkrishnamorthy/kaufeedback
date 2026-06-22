import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getMasters, submitFeedback } from "./services/api";
import StarRating from "./components/StarRating";
import ThankYou from "./pages/ThankYou";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function FeedbackForm() {

  const [masters, setMasters] = useState({
    departments: [],
    services: [],
    locations: []
  });

  const [form, setForm] = useState({
    patientName: "",
    age: "",
    visitType: "OP",
    departmentId: "",
    serviceId: "",
    locationId: "",
    rating: 0,
    comments: ""
  });

  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {
    loadMasters();
  }, []);

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const department =
      params.get("department");

    const location =
      params.get("location");

    if (department) {

      setForm((prev) => ({
        ...prev,
        departmentId:
          Number(department)
      }));
    }

    if (location) {

      setForm((prev) => ({
        ...prev,
        locationId:
          Number(location)
      }));
    }

  }, []);

  const loadMasters = async () => {

    try {

      const data =
        await getMasters();

      setMasters(data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.patientName) {
      alert("Patient Name Required");
      return;
    }

    if (!form.age) {
      alert("Age Required");
      return;
    }

    if (!form.departmentId) {
      alert("Department Required");
      return;
    }

    if (!form.serviceId) {
      alert("Service Required");
      return;
    }

    if (!form.locationId) {
      alert("Location Required");
      return;
    }

    if (!form.rating) {
      alert("Rating Required");
      return;
    }

    try {

      await submitFeedback(form);

      setSubmitted(true);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to submit feedback"
      );
    }
  };

  if (submitted) {

    return <ThankYou />;
  }

  return (

    <div className="container">

      <div className="card">

        <div className="logo-container">

          <img
            src="/kauvery-logo.png"
            alt="Kauvery Hospital"
          />

        </div>

        <h1>
          Kauvery Hospital
        </h1>

        <h3>
          Patient Feedback Portal
        </h3>

        <form
          onSubmit={handleSubmit}
        >

          <input
            placeholder="Patient Name"
            value={form.patientName}
            onChange={(e) =>
              setForm({
                ...form,
                patientName:
                  e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({
                ...form,
                age:
                  e.target.value
              })
            }
          />

          <select
            value={form.visitType}
            onChange={(e) =>
              setForm({
                ...form,
                visitType:
                  e.target.value
              })
            }
          >
            <option value="OP">
              OP
            </option>

            <option value="IP">
              IP
            </option>
          </select>

          <select
            value={
              form.departmentId
            }
            onChange={(e) =>
              setForm({
                ...form,
                departmentId:
                  e.target.value
              })
            }
          >

            <option value="">
              Select Department
            </option>

            {masters.departments?.map(
              (d) => (

                <option
                  key={d.id}
                  value={d.id}
                >
                  {d.name}
                </option>

              )
            )}

          </select>

          <select
            value={form.serviceId}
            onChange={(e) =>
              setForm({
                ...form,
                serviceId:
                  e.target.value
              })
            }
          >

            <option value="">
              Select Service
            </option>

            {masters.services?.map(
              (s) => (

                <option
                  key={s.id}
                  value={s.id}
                >
                  {s.name}
                </option>

              )
            )}

          </select>

          <select
            value={form.locationId}
            onChange={(e) =>
              setForm({
                ...form,
                locationId:
                  e.target.value
              })
            }
          >

            <option value="">
              Select Location
            </option>

            {masters.locations?.map(
              (l) => (

                <option
                  key={l.id}
                  value={l.id}
                >
                  {l.name}
                </option>

              )
            )}

          </select>

          <label>
            Patient Rating
          </label>

          <StarRating
            rating={form.rating}
            setRating={(value) =>
              setForm({
                ...form,
                rating: value
              })
            }
          />

          <textarea
            rows="5"
            placeholder="Share your experience with us..."
            value={form.comments}
            onChange={(e) =>
              setForm({
                ...form,
                comments:
                  e.target.value
              })
            }
          />

          <button
            type="submit"
          >
            Submit Feedback
          </button>

        </form>

      </div>

    </div>

  );
}

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={
          <FeedbackForm />
        }
      />

      <Route
        path="/admin"
        element={
          <AdminDashboard />
        }
      />

    </Routes>

  );
}

export default App;