import React, { useState } from 'react';
import styles from './ContactForm.module.scss';
import LoadingIndicator from '../LoadingIndicator';
import { InlineText } from 'react-tinacms-inline';

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
				<label className={styles.label}><InlineText name="Name label" /></label>
				<input type="name" name="name" className={styles.input} />
				<label className={styles.label}><InlineText name="Email label" /></label>
				<input type="email" name="email" className={styles.input} />
				<label className={styles.label}><InlineText name="Message label" /></label>
				<textarea name="message" rows={5} className={styles.input} />

				{status === 'initial' && <button className={styles.button}><InlineText name="Submit label" /></button>}
				{status === 'loading' && <LoadingIndicator />}
				{status === 'success' && <InlineText name="thanksMessage" />}
				{status === 'error' && <p>Ooops! There was an error.</p>}
			</form>
		</div>
	);
};
