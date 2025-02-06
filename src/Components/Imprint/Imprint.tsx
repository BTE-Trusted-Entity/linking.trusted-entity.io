import * as styles from './Imprint.module.css';

export const Imprint = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Imprint</h1>
        <section className={styles.imprintSection}>
          <p className={styles.imprintLine}>KILT Foundation</p>
          <p className={styles.imprintLine}>
            Genesis Building, 5th Floor, Genesis Close,
          </p>
          <p className={styles.imprintLine}>
            PO Box 446, Cayman Islands, KY1-1106
          </p>
        </section>

        <section className={styles.imprintSection}>
          <p className={styles.imprintLine}>Certificate No. 418097</p>
          <p className={styles.imprintLine}>VAT No: DE316284270</p>
          <p className={styles.imprintLine}>
            Directors: Rishant Kumar, Svetoslav Boyadzhiev
          </p>
        </section>

        <section className={styles.imprintSection}>
          <p className={styles.imprintLine}>
            Contact:{' '}
            <a className={styles.anchor} href="mailto:hello@kilt.io">
              hello@kilt.io
            </a>
          </p>
        </section>
      </div>
    </main>
  );
};
