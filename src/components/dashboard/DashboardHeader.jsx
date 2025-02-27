import { FaBars, FaUser, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Image } from "@components";

const DashboardHeader = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white shadow-sm border-bottom">
      <Container fluid className="py-2">
        <div className="d-flex align-items-center justify-content-between">

          <div className="d-flex align-items-center">
            <Button variant="link" className="text-secondary d-md-none" onClick={toggleSidebar}>
              <FaBars className="fs-5" />
            </Button>

            <Image
              src="/images/roam-digi-logo.png"
              className="ms-3 mb-2 d-md-none"
              alt="Roamdigi Logo"
            />
          </div>

          <div className="d-flex align-items-center gap-3">
            <Button variant="link" className="text-secondary">
              <FaEnvelope className="fs-5" />
            </Button>

            <div className="dropdown">
              <Button
                variant="link"
                className="border-0 bg-transparent p-0 dropdown-toggle"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold"
                  style={{ width: "2rem", height: "2rem", backgroundColor: "var(--primary-color)" }}
                >
                  {/* {user.name?.charAt(0).toUpperCase()} */} U
                </div>
              </Button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userDropdown">
                <li className="px-3 py-2 text-secondary small">
                  Signed in as <br /> <strong>user@example.com</strong>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Button variant="link" className="dropdown-item" href="/profile">
                    <FaUser className="me-2" /> View Profile
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="dropdown-item" /*onClick={() => dispatch(logout())}*/>
                    <FaSignOutAlt className="me-2" /> Logout
                  </Button>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </Container>
    </header>
  );
};

export default DashboardHeader;
