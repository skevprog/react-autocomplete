import './styles.css';

type Status = 'error' | 'info';

interface StatusLabelProps {
   status: Status;
   message: string;
};

function StatusLabel({ status, message }: StatusLabelProps): JSX.Element {
   return (
   <p className={`status-label-container ${status}`}>
      {message}
   </p>)
}

export default StatusLabel;
