import { FC, ReactNode } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

interface IModalProps {
  content?: ReactNode;
  closeOnClickOverlay?: boolean;
  visible?: boolean;
  setVisible?: (boolean) => void;
}

const Modal: FC<IModalProps> = ({
  content,
  closeOnClickOverlay = true,
  visible = false,
  setVisible,
}) => {
  return (
    <>
      {visible ? (
        <View
          className={styles.modal}
          style={{
            opacity: visible ? 1 : 0,
          }}
          onClick={() => {
            if (closeOnClickOverlay && setVisible) {
              setVisible(false);
            }
          }}
        >
          {content ? <View className={styles.content}>{content}</View> : null}
        </View>
      ) : null}
    </>
  );
};

export default Modal;
