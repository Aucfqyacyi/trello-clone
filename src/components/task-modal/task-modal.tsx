import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { FormikTagSelect, FormikUserSelect } from '~/components';
import { TaskModalProps } from './task-modal-props.ts';
import { useTaskModal } from './use-task-modal.ts';

export function TaskModal(props: TaskModalProps) {
    const [initialValues, onSubmit] = useTaskModal(props);
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form>
                        <ModalHeader>Add new task</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Task Title</FormLabel>
                                <Field as={Input} name={'title'} maxLength={21} placeholder="Maximum 20 characters" />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Date of creation</FormLabel>
                                <Field name={'created'} type="date" as={Input} />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Data of expiration</FormLabel>
                                <Field
                                    name={'expired'}
                                    as={Input}
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Assign to</FormLabel>
                                <FormikUserSelect name="assignTo" />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Author</FormLabel>
                                <FormikUserSelect name="author" />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Task description</FormLabel>
                                <Field
                                    name={'description'}
                                    as={Textarea}
                                    maxLength={2000}
                                    placeholder="Maximum 2000 characters"
                                />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Tags</FormLabel>
                                <FormikTagSelect name="tags" maxItems={2} />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" colorScheme="blue" mr={3}>
                                Add
                            </Button>
                            <Button variant="ghost" onClick={props.onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
}
