import React from "react";

export default function Modal() {
  return (
    <div>
      {/* Trigger Buttons */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#verticallyCenteredModal"
      >
        Open Centered Modal
      </button>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#scrollableModal"
      >
        Open Scrollable Modal
      </button>

      {/* Vertically Centered Modal */}
      <div
        className="modal fade"
        id="verticallyCenteredModal"
        tabIndex="-1"
        aria-labelledby="verticallyCenteredModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="verticallyCenteredModalLabel">
                Modal Title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              Content for a vertically centered modal.
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vertically Centered Scrollable Modal */}
      <div
        className="modal fade"
        id="scrollableModal"
        tabIndex="-1"
        aria-labelledby="scrollableModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="scrollableModalLabel">
                Scrollable Modal Title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <p>Scrollable content goes here...</p>
              <p>More content...</p>
              <p>More content...</p>
              {/* Add as much content as needed to demonstrate scrolling */}
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
