import React, { useState } from "react";

function Support() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    topic: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.topic
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Form submitted:", formData);

      const randomTicketNumber = Math.floor(1 + Math.random() * 9999)
        .toString()
        .padStart(4, "0");
      setTicketNumber(randomTicketNumber);
      setTicketSent(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        topic: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.firstName && formData.lastName && formData.email && formData.topic;

  return (
    <div className="Support">
      <div className="container">
        <div className="head">
          <h1>Support Ticket Form</h1>
        </div>

        {!ticketSent ? (
          <form onSubmit={handleSubmit}>
            <div className="leftForm">
              <div className="rows">
                <p className="labelName">
                  Name <span style={{ color: "red" }}>*</span>
                </p>

                <div className="both">
                  <div className="names">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="firstName">First</label>
                  </div>

                  <div className="names">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="lastName">Last</label>
                  </div>
                </div>
              </div>

              <div className="rows">
                <label htmlFor="email" className="labelName">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="rows">
                <p className="topichead">
                  Topic <span style={{ color: "red" }}>*</span>
                </p>
                <div className="topic-container">
                  <p>What can we help you today?</p>
                  <label className="topic-option">
                    <input
                      type="radio"
                      name="topic"
                      value="General"
                      checked={formData.topic === "General"}
                      onChange={handleChange}
                      required
                      id="accent"
                    />
                    General
                  </label>
                  <label className="topic-option">
                    <input
                      type="radio"
                      name="topic"
                      value="Bug"
                      checked={formData.topic === "Bug"}
                      onChange={handleChange}
                      required
                      id="accent"
                    />
                    Bug
                  </label>
                </div>
              </div>
            </div>

            <div className="rightForm">
              <div className="rows">
                <label htmlFor="description" className="desc">
                  Description
                  <span>optional</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description Report"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: isFormValid ? "#ffa00a" : "" }}
              >
                SEND
              </button>
            </div>
          </form>
        ) : (
          <div className="newText">
            <div className="containers">
              <p className="thanks">
                Thank you for sending us your report, we will <br /> track the
                problem now
              </p>
              <div className="number">
                <p className="numbers">ticket number: &nbsp;</p> {ticketNumber}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Support;
