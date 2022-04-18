import { useDispatch } from "react-redux";

class ErrorService {
  dispatch = useDispatch();
  checkError(error: Response) {
    switch (error.status) {
      case 401:
        window.location.href = "/courses";
        return;
      default:
        return error;
    }
  }
}

export default ErrorService;
