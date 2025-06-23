import { Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import React from 'react';

interface FormikWrapperProps {
  initialValues: FormikValues;
  validationSchema?: any;
  onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<void>;
  children: (props: FormikProps<FormikValues>) => React.ReactNode; // <-- ajuste aqui

}

const FormikWrapper: React.FC<FormikWrapperProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {children}
  </Formik>
);

export default FormikWrapper;