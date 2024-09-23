import { ErrorBoundary } from '@/components/errorBoundary';
import { Stack } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * MainContent Component
 *
 * This component serves as a container for the main content of the application. It includes an error boundary
 * to catch and handle any errors that may occur in its child components, ensuring a smoother user experience.
 *
 * @component MainContent
 * @param {Props} props - The props for the component.
 * @param {ReactNode} props.children - The child components to be rendered within the MainContent.
 * @returns {JSX.Element} A stack container that holds the main content and error handling logic.
 */
const MainContent: FunctionComponent<Props> = ({ children }: Props): JSX.Element => (
  <Stack flexGrow={1} overflow="auto">
    <ErrorBoundary name="Main Content">{children}</ErrorBoundary>
  </Stack>
);

export default MainContent;
