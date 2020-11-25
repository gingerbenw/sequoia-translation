import { useI18n } from '@tinalabs/react-tinacms-i18n';

export const useFieldName = () => {
	const i18n = useI18n();

	const selectedLocale = i18n.getFormateLocale();
	const getFieldName = (name: string) => `${selectedLocale}.${name}`;

	return {
		getFieldName,
	};
};

export default useFieldName;
