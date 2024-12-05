import React from "react";

export default function Modal({data}) {
  console.log(data , "data");
  return (
    <div>
      {/* Trigger Buttons */}
      {/* <button
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
      </button> */}

      {/* Vertically Centered Modal */}
      <div
        className="modal fade"
        id="verticallyCenteredModal"
        tabIndex="-1"
        aria-labelledby="verticallyCenteredModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-black rounded-lg">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title " id="verticallyCenteredModalLabel">
                Modal Title {data}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Modal Body */}
            <div className="modal-body " > 
              Content for a vertically centered modal.lorem 
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime aliquid architecto laboriosam, fuga cum repudiandae eius qui dolores nobis assumenda?
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close 3
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
