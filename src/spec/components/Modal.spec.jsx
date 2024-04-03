import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Modal from "../../components/Common/Modal";

vi.mock("axios");
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");

  return {
    ...originalModule,
    useParams: () => ({
      id: "123",
    }),
  };
});

describe("Modal component tests", () => {
  const onCloseMock = vi.fn();
  const setIsModalOpenMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should not render when isOpen is false", () => {
    render(
      <MemoryRouter>
        <Modal
          isOpen={false}
          onClose={onCloseMock}
          setIsModalOpen={setIsModalOpenMock}
        />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Share with your friends")).toBeNull();
  });

  it("Should render when isOpen is true", () => {
    render(
      <MemoryRouter>
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          setIsModalOpen={setIsModalOpenMock}
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByPlaceholderText("Write the email here."),
    ).toBeInTheDocument();
  });

  it("Should show a warning message for an invalid email", async () => {
    render(
      <MemoryRouter>
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          setIsModalOpen={setIsModalOpenMock}
        />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("Write the email here."), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText("Share"));

    const warningText = await screen.findByText(
      "Please enter a valid email address.",
    );

    expect(warningText).toBeInTheDocument();
  });

  it("Should send a request for a valid email", async () => {
    render(
      <MemoryRouter>
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          setIsModalOpen={setIsModalOpenMock}
        />
      </MemoryRouter>,
    );
    axios.post.mockResolvedValue({ statusText: "OK" });

    const validEmail = "test@example.com";

    fireEvent.change(screen.getByPlaceholderText("Write the email here."), {
      target: { value: validEmail },
    });
    fireEvent.click(screen.getByText("Share"));

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: validEmail,
      customId: "123",
    });
  });

  it("Should close the modal when the Cancel button is clicked", async () => {
    render(
      <MemoryRouter>
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          setIsModalOpen={setIsModalOpenMock}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("Should show a loading spinner when an email is being sent", async () => {
    render(
      <MemoryRouter>
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          setIsModalOpen={setIsModalOpenMock}
        />
      </MemoryRouter>,
    );

    axios.post.mockImplementation(() => new Promise(() => {}));

    fireEvent.change(screen.getByPlaceholderText("Write the email here."), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Share"));

    await waitFor(() =>
      expect(screen.getByText("Sending Email")).toBeInTheDocument(),
    );
  });

  it("Should close the modal after email is sent successfully", async () => {
    render(
      <MemoryRouter>
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          setIsModalOpen={setIsModalOpenMock}
        />
      </MemoryRouter>,
    );

    axios.post.mockResolvedValue({ statusText: "OK" });

    fireEvent.change(screen.getByPlaceholderText("Write the email here."), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Share"));

    await waitFor(() => expect(setIsModalOpenMock).toHaveBeenCalledWith(false));
  });
});
