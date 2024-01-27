import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  LandingPage,
  Home,
  About,
  GuestAnlyses,
  Contact,
  Login,
  ForgotPassword,
  ResetPasowrd,
  Staff,
  DashboardHome,
  UsersController,
  UsersPreview,
  Register,
  AnlysisController,
  AddAnlyze,
  PreviewAnlysis,
  UpdateAnlyze,
  StorageController,
  ItemsPreview,
  AddItem,
  ResultsController,
  ResultsPreview,
  UnpreparedSamples,
  AddResult,
  EditResult,
  MessageController,
  UsersMessages,
  GuestsMessages,
  PaymentsController,
  PaymentsPreviewContainer,
  NotPaidResultsContainer,
  PaymentPreview,
  AdsController,
  AddNewAdd,
  AdsPreviewContainer,
  Doctor,
  DoctorHome,
  Patient,
  PatientHome,
  HealthCalculators,
  BMR,
  BMI,
  PatResultsPreviewContainer,
  PatPaymentsPreviewContainer,
  Error,
  Anlysis,
  AnlyiseDetails,
  Profile,
  ResultDetails,
  MessageInterface,
  AdDetails,
  AddAPayment,
  AllDoctorResults,
} from "../../componentsLoader/ComponentsLoader.js";

export default function Main({
  isFormOpen,
  setIsFormOpen,
  userDetails,
  setUserDetails,
  setUserData,
  isPdfLoading,
  setIsPdfLoading,
  goToPage,
  logout,
  darkMode,
  setActiveId,
}) {
  return (
    <main className={`${isFormOpen ? "" : ""}`}>
      <div
        className={`${
          isFormOpen ? "d-block " : "d-none"
        } position-absolute bg-black low-opasity z-150  w-100`}
      ></div>
      <Routes>
        {/* Components With Start Path '{Domain}/' */}
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="center-container">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              }
            >
              <LandingPage user={userDetails} />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              userDetails.usertype === "Staff" ||
              userDetails.usertype === "Admin" ? (
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  {" "}
                  <DashboardHome user={userDetails} setActiveId={setActiveId} />
                </Suspense>
              ) : userDetails.usertype === "Patient" ? (
                <PatientHome
                  user={userDetails}
                  setIsPdfLoading={setIsPdfLoading}
                  setActiveId={setActiveId}
                />
              ) : userDetails.usertype === "Doctor" ? (
                <DoctorHome user={userDetails} setActiveId={setActiveId} />
              ) : (
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  {" "}
                  <Home setActiveId={setActiveId} />
                </Suspense>
              )
            }
          />
          <Route
            path="/Home"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Home setActiveId={setActiveId} />
              </Suspense>
            }
          />
          <Route
            path="/About"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <About setActiveId={setActiveId} darkMode={darkMode} />
              </Suspense>
            }
          />
          <Route
            path="/GuestAnlyses"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <GuestAnlyses setActiveId={setActiveId} darkMode={darkMode} />{" "}
              </Suspense>
            }
          />
          <Route
            path="/AnlyiseDetails/:code"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <AnlyiseDetails />
              </Suspense>
            }
          />
          <Route
            path="/Anlysis"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Anlysis setActiveId={setActiveId} />
              </Suspense>
            }
          />
          <Route
            path="/Contact"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Contact setActiveId={setActiveId} />{" "}
              </Suspense>
            }
          />{" "}
          <Route
            path="/Login"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Login
                  setUserData={setUserData}
                  userDetails={userDetails}
                  goToPage={goToPage}
                  setActiveId={setActiveId}
                />
              </Suspense>
            }
          />
          <Route
            path="/Profile/:id"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Profile
                  userDetails={userDetails}
                  isFormOpen={isFormOpen}
                  setIsFormOpen={setIsFormOpen}
                  setUserDetails={setUserDetails}
                />
              </Suspense>
            }
          />
          <Route
            path="/ResultDetails/:id"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <ResultDetails user={userDetails} />{" "}
              </Suspense>
            }
          />
          <Route
            path="/PaymentPreview/:id"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <PaymentPreview
                  setIsPdfLoading={setIsPdfLoading}
                  darkMode={darkMode}
                />{" "}
              </Suspense>
            }
          />
          <Route
            path="/AddAPayment/:id"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <AddAPayment />
              </Suspense>
            }
          />
          <Route
            path="/password/forgot-password"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <ForgotPassword darkMode={darkMode} />
              </Suspense>
            }
          />
          <Route
            path="auth/password/reset-password/:userId/:token"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <ResetPasowrd darkMode={darkMode} />
              </Suspense>
            }
          />
          <Route
            path="/AdDetails/:id"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <AdDetails darkMode={darkMode} />{" "}
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Error />
              </Suspense>
            }
          />
        </Route>
        {/* Components With Start Path '{Domain}/Doctor' */}
        <Route
          path="/Doctor"
          element={
            <Suspense
              fallback={
                <div className="center-container">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              }
            >
              <Doctor />
            </Suspense>
          }
        >
          <Route
            path="/Doctor/Home"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <DoctorHome user={userDetails} setActiveId={setActiveId} />{" "}
              </Suspense>
            }
          />
          <Route
            path="/Doctor/AllDoctorResults/:ident"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <AllDoctorResults user={userDetails} />{" "}
              </Suspense>
            }
          />
          <Route
            path="/Doctor/contactLab/:id"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <MessageInterface
                  user={userDetails}
                  darkMode={darkMode}
                  setActiveId={setActiveId}
                />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Error />
              </Suspense>
            }
          />
        </Route>
        {/* Components With Start Path '{Domain}/Staff' */}
        <Route
          path="/Staff"
          element={
            <Suspense
              fallback={
                <div className="center-container">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              }
            >
              <Staff user={userDetails} logout={logout} />
            </Suspense>
          }
        >
          <Route
            path="/Staff"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                {" "}
                <DashboardHome user={userDetails} setActiveId={setActiveId} />
              </Suspense>
            }
          />
          <Route
            path="/Staff/dashboard"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                {" "}
                <DashboardHome user={userDetails} setActiveId={setActiveId} />
              </Suspense>
            }
          />
          <Route
            path="/Staff/UsersController"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                {" "}
                <UsersController setActiveId={setActiveId} />
              </Suspense>
            }
          >
            <Route
              path="/Staff/UsersController/Register"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <Register usertype={userDetails.usertype} />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/UsersController/UsersPreview"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <UsersPreview user={userDetails} />{" "}
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/Staff/AnlysisController"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <AnlysisController setActiveId={setActiveId} />
              </Suspense>
            }
          >
            <Route
              path="/Staff/AnlysisController/AddAnlyze"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <AddAnlyze />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/AnlysisController/PreviewAnlysis"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <PreviewAnlysis />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/AnlysisController/UpdateAnlyze/:code"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <UpdateAnlyze />{" "}
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/Staff/StorageController"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <StorageController setActiveId={setActiveId} />{" "}
              </Suspense>
            }
          >
            <Route
              path="/Staff/StorageController/AddItem"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <AddItem />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/StorageController/ItemsPreview"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <ItemsPreview setIsFormOpen={setIsFormOpen} />{" "}
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/Staff/ResultsController"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <ResultsController setActiveId={setActiveId} />{" "}
              </Suspense>
            }
          >
            <Route
              path="/Staff/ResultsController/AddResult"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <AddResult />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/ResultsController/EditResult/:id"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <EditResult />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/ResultsController/ResultsPreview"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <ResultsPreview />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/ResultsController/UnpreparedSamples"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <UnpreparedSamples />{" "}
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/Staff/PaymentsController"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <PaymentsController setActiveId={setActiveId} />{" "}
              </Suspense>
            }
          >
            <Route
              path="/Staff/PaymentsController/PaymentsPreview"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  {" "}
                  <PaymentsPreviewContainer
                    setIsPdfLoading={setIsPdfLoading}
                  />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/PaymentsController/NotPaidPayments"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <NotPaidResultsContainer />{" "}
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/Staff/AdsController"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <AdsController setActiveId={setActiveId} />{" "}
              </Suspense>
            }
          >
            <Route
              path="/Staff/AdsController/AddNewAdd"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <AddNewAdd setIsFormOpen={setIsFormOpen} />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/AdsController/AdsPreview"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <AdsPreviewContainer setIsFormOpen={setIsFormOpen} />{" "}
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/Staff/MessagePreview"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <MessageController
                  darkMode={darkMode}
                  setActiveId={setActiveId}
                />{" "}
              </Suspense>
            }
          >
            <Route
              path="/Staff/MessagePreview/UsersMessages"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <UsersMessages darkMode={darkMode} />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Staff/MessagePreview/GuestMessages"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  {" "}
                  <GuestsMessages
                    darkMode={darkMode}
                    setIsFormOpen={setIsFormOpen}
                  />{" "}
                </Suspense>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Error />
              </Suspense>
            }
          />
        </Route>
        {/* Components With Start Path '{Domain}/Patient' */}
        <Route
          path="/Patient"
          element={
            <Suspense
              fallback={
                <div className="center-container">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              }
            >
              <Patient />
            </Suspense>
          }
        >
          <Route
            path="/Patient/PatientHome"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <PatientHome
                  user={userDetails}
                  setIsPdfLoading={setIsPdfLoading}
                  setActiveId={setActiveId}
                />
              </Suspense>
            }
          />
          <Route
            path="/Patient/HealthCalculators"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <HealthCalculators setActiveId={setActiveId} />{" "}
              </Suspense>
            }
          >
            <Route
              path="/Patient/HealthCalculators/BMR"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <BMR />{" "}
                </Suspense>
              }
            />
            <Route
              path="/Patient/HealthCalculators/BMI"
              element={
                <Suspense
                  fallback={
                    <div className="center-container">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <BMI />{" "}
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/Patient/ResultsPreview/:ident"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <PatResultsPreviewContainer />{" "}
              </Suspense>
            }
          />
          <Route
            path="/Patient/PaymentsReview/:ident"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                {" "}
                <PatPaymentsPreviewContainer
                  setIsPdfLoading={setIsPdfLoading}
                />{" "}
              </Suspense>
            }
          />
          <Route
            path="/Patient/contactLab/:id"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                {" "}
                <MessageInterface
                  user={userDetails}
                  darkMode={darkMode}
                  setActiveId={setActiveId}
                />{" "}
              </Suspense>
            }
          />
          <Route
            path="/Patient/Anlysis"
            element={
              <Suspense
                fallback={
                  <div className="center-container">
                    <div
                      className="spinner-border text-primary d-flex justify-content-center align-items-center"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Anlysis setActiveId={setActiveId} />
              </Suspense>
            }
          />
        </Route>
        {/* Error Page for '{Domain}/*' where *: UnValid Path */}
        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <div className="center-container">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              }
            >
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}
