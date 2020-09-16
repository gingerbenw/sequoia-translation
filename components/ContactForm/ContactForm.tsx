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
				action={process.env.CONTACT_FORM_URL}
				method="POST"
			>
				<label>Name</label>
				<input type="name" name="name" placeholder="Name" />
				<label>Email</label>
				<input type="email" name="email" placeholder="Email" />
				<label>Message</label>
				<textarea name="message" placeholder="Message" rows={5} />

				{status === 'initial' && <button>Submit</button>}
				{status === 'loading' && <LoadingIndicator />}
				{status === 'success' && <p>Thanks!</p>}
				{status === 'error' && <p>Ooops! There was an error.</p>}
			</form>
		</div>
	);
};
