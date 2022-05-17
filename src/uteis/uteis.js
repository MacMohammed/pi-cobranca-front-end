import  Modal from '../../src/components/modal/Modal'

export const runModal = (msgBody, title) => {
    if (document.getElementsByTagName("x-modal")[0]) {
        document.getElementsByTagName("x-modal")[0].remove();
    }

    const modal = document.createElement('x-modal');
    const divModalTitle = document.createElement('div');
    const divModalBody = document.createElement('div');

    divModalTitle.slot = "title";
    divModalTitle.innerHTML = title;

    divModalBody.slot = "body";
    divModalBody.innerHTML = `${msgBody}`;

    modal.appendChild(divModalTitle);
    modal.appendChild(divModalBody);

    document.body.append(modal);
}