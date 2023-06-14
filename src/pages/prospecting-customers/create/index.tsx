import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createProspectingCustomer } from 'apiSdk/prospecting-customers';
import { Error } from 'components/error';
import { prospectingCustomerValidationSchema } from 'validationSchema/prospecting-customers';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { ProspectingCustomerInterface } from 'interfaces/prospecting-customer';

function ProspectingCustomerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProspectingCustomerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProspectingCustomer(values);
      resetForm();
      router.push('/prospecting-customers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProspectingCustomerInterface>({
    initialValues: {
      persona: '',
      company: '',
      industry: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: prospectingCustomerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Prospecting Customer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="persona" mb="4" isInvalid={!!formik.errors?.persona}>
            <FormLabel>Persona</FormLabel>
            <Input type="text" name="persona" value={formik.values?.persona} onChange={formik.handleChange} />
            {formik.errors.persona && <FormErrorMessage>{formik.errors?.persona}</FormErrorMessage>}
          </FormControl>
          <FormControl id="company" mb="4" isInvalid={!!formik.errors?.company}>
            <FormLabel>Company</FormLabel>
            <Input type="text" name="company" value={formik.values?.company} onChange={formik.handleChange} />
            {formik.errors.company && <FormErrorMessage>{formik.errors?.company}</FormErrorMessage>}
          </FormControl>
          <FormControl id="industry" mb="4" isInvalid={!!formik.errors?.industry}>
            <FormLabel>Industry</FormLabel>
            <Input type="text" name="industry" value={formik.values?.industry} onChange={formik.handleChange} />
            {formik.errors.industry && <FormErrorMessage>{formik.errors?.industry}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'prospecting_customer',
  operation: AccessOperationEnum.CREATE,
})(ProspectingCustomerCreatePage);
