export default function ModalComponent() {

  const body = document.getElementsByTagName('body')[0];
  const contactBtn = document.getElementById('contact');
  const contactModal = document.getElementById('contact-modal');

  let modalIsVisible = false;

  const toggleModal = () => {
    modalIsVisible = !modalIsVisible;

    if (modalIsVisible) {
      body.classList.add('has-modal');
      contactModal.classList.add('active');
    } else {
      body.classList.remove('has-modal');
      contactModal.classList.remove('active');
    }
  }
  
  contactBtn.addEventListener('click', toggleModal);
}