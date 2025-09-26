import { createPortal } from "react-dom";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) {
  if (!show) return null;

  return createPortal(
    <div className="modale-overlay">
      <div className="modale">
        {/* Titolo */}
        {title && <h2 className="modale-title">{title}</h2>}
        {/* Contenuto */}
        {content && <div className="modale-content">{content}</div>}

        {/* Azioni */}
        <div className="modale-actions">
          <button className="button-close" onClick={onClose}>
            Chiudi
          </button>
          {onConfirm && (
            <button className="button-confirm" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
