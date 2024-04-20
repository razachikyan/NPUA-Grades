import classNames from "classnames";
import styles from "./styles.module.scss";
import { IPaginationProps } from "./types";
import { nanoid } from "nanoid";

export const Pagination = ({ onClick, size, current }: IPaginationProps) => {
  const pagArr = new Array(size).fill(0);

  return (
    <div className={styles.container}>
      {pagArr.map((_, ind) => (
        <span
          key={nanoid()}
          onClick={() => onClick(ind)}
          className={classNames(styles.item, {
            [styles.active]: current === ind,
          })}
        >
          {ind + 1}
        </span>
      ))}
    </div>
  );
};
