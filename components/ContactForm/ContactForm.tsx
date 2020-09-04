import React, { useState } from 'react';
import styles from './ContactForm.module.scss';
import LoadingIndicator from '../LoadingIndicator';

export const ContactForm = () => {
	const [status, setStatus] = useState('initial');

	const submitForm = (e) => {
		e.preventDefault();

		setStatus('loading');
        
		const form = e.target;
		const data = new FormData(form);
		const xhr = new XMLHttpRequest();
        
		xhr.open(form.method, form.action);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== XMLHttpRequest.DONE) return;
			if (xhr.status === 200) {
				form.reset();
				setStatus('success');
			} else {
				setStatus('error');
			}
		};
        
		xhr.send(data);
	};

	return (
		<div className={styles.contact}>

			<form
				onSubmit={submitForm}
				action="https://formspree.io/mjvanvbz"
				method="POST"
			>
				<label>Email:</label>
				<input type="email" name="email" />
				<label>Message:</label>
				<input type="text" name="message" />

				{status === 'initial' && <button>Submit</button>}
				{status === 'loading' && <LoadingIndicator />}
				{status === 'success' && <p>Thanks!</p>}
				{status === 'error' && <p>Ooops! There was an error.</p>}
			</form>
		</div>
	);
};
