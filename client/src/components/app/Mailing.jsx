/**
 * Mailing component for sending emails to specified targets.
 *
 * @component
 * @example
 * return (
 *   <Mailing />
 * )
 *
 * @returns {JSX.Element} The Mailing component.
 *
 * @description
 * This component provides a form for sending emails to specified targets. It includes fields for the subject, header, message, and targets (comma-separated email addresses). It also displays insights about the mailing process, such as the number of invalid targets, matched targets, successful emails, and failed emails.
 *
 * @function
 * @name Mailing
 *
 * @requires useState - React hook for managing state.
 * @requires useNotification - Custom hook for displaying notifications.
 * @requires FetchWithAuth - Custom function for making authenticated API requests.
 * @requires Card - Material Tailwind component for displaying content in a card layout.
 */
import { useState } from "react";
import { useNotification } from "../layout/NotificationHelper";
import FetchWithAuth from "../auth/api";
import { Card } from "@material-tailwind/react";

const Mailing = () => {
  const { addNotification } = useNotification();
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [header, setHeader] = useState("");
  const [targets, setTargets] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidTargetsCount, setInvalidTargetsCount] = useState(0);
  const [matchedTargetsCount, setMatchedTargetsCount] = useState(0);
  const [successfulEmails, setSuccessfulEmails] = useState([]);
  const [failedEmails, setFailedEmails] = useState([]);

  const handleMailing = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await FetchWithAuth(
        `/mailing`,
        {
          method: "POST",
          body: JSON.stringify({
            message: message,
            subject: subject,
            header: header,
            targets: targets.split(",").map((email) => email.trim()),
          }),
          credentials: "include",
        },
        "Failed to send mail(s)"
      );

      if (response.success) {
        const { message, invalidTargets, matchedTargets, successfulEmails, failedEmails } =
          response;

        addNotification(message, "success");
        setMessage("");
        setSubject("");
        setHeader("");
        setTargets("");
        setInvalidTargetsCount(parseFloat(invalidTargets));
        setMatchedTargetsCount(matchedTargets);
        setSuccessfulEmails(successfulEmails);
        setFailedEmails(failedEmails);
      } else if (!response.success) {
        const { invalidTargets, matchedTargets, successfulEmails, failedEmails } = response;
        addNotification("Mailing operation complete without errors but not successful");
        setInvalidTargetsCount(parseFloat(invalidTargets));
        setMatchedTargetsCount(matchedTargets);
        setSuccessfulEmails(successfulEmails);
        setFailedEmails(failedEmails);
      } else {
        addNotification("Mailing was not successful", "error");
      }
    } catch (err) {
      addNotification("An error occurred while sending the mail(s)", "error");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className='profile-box flex flex-col space-y-2 md:max-w-[65dvw] lg:max-w-[30dvw] w-full'
      variant='gradient'
      color='gray'>
      <h2 className='text-lg font-semibold mb-2'>Send Mail(s)</h2>
      <form onSubmit={handleMailing} className='flex flex-col space-y-2'>
        <div>
          <label className='block text-sm font-semibold text-text-light mb-1' htmlFor='subject'>
            Subject
          </label>
          <input
            type='text'
            className='form-input w-full'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            id='subject'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-semibold text-text-light mb-1' htmlFor='header'>
            Header
          </label>
          <input
            type='text'
            className='form-input w-full'
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            id='header'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-semibold text-text-light mb-1' htmlFor='message'>
            Message
          </label>
          <textarea
            className='form-input w-full'
            value={message}
            rows='3'
            onChange={(e) => setMessage(e.target.value)}
            id='message'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-semibold text-text-light mb-1' htmlFor='targets'>
            Targets (comma-separated email addresses)
          </label>
          <textarea
            className='form-input w-full'
            value={targets}
            onChange={(e) => setTargets(e.target.value)}
            id='targets'
            rows='2'
            placeholder="Enter comma-separated email addresses or '*' for all users"
          />
        </div>
        <button type='submit' className='accent-btn w-full' disabled={loading}>
          {loading ? "Sending..." : "Send mail"}
        </button>
      </form>

      <div className='mt-4'>
        <h3 className='text-sm font-semibold'>Mailing Insights:</h3>
        <div className='flex flex-col sm:flex-row justify-between text-sm'>
          <p>Invalid Targets: {invalidTargetsCount}</p>
          <p>Matched Targets: {matchedTargetsCount}</p>
        </div>
        <p className='text-sm'>Successful Emails:</p>
        <ul className='text-sm list-disc ml-4'>
          {successfulEmails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
        <p className='text-sm'>Failed Emails:</p>
        <ul className='text-sm list-disc ml-4'>
          {failedEmails.map((entry, index) => (
            <li key={index}>
              {entry.email} - {entry.error}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default Mailing;
