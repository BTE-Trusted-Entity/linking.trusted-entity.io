import styles from './Terms.module.css';

export const Terms = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Terms and Conditions for the Website to Link Addresses to web3name
        </h1>
        <section>
          <h2 className={styles.sectionHeading}>
            Application of These Terms and Conditions
          </h2>

          <p>
            For the Website to Link Addresses to web3name (the
            “web3name.trusted-entity.io” or the “Link Addresses Website” or
            “Website”) by B.T.E. BOTLabs Trusted Entity GmbH (hereinafter
            referred to as “BTE”, “us”, “we” or “our”) a website with software
            as provided under linking.trusted-entity.io (the “Software”) and
            defined below these Terms and Conditions shall apply.
          </p>
          <p>
            PLEASE READ THE TERMS AND CONDITIONS CAREFULLY TO ENSURE THAT YOU
            UNDERSTAND EACH PROVISION. IF YOU DO NOT AGREE TO ALL OF THE TERMS,
            DO NOT ACCESS OR USE THE SOFTWARE.
          </p>
          <p>
            YOU ACCEPT THE TERMS AND CONDITIONS, EITHER BY CLICKING TO SIGNIFY
            ACCEPTANCE, OR BY TAKING ANY ONE OR MORE OF THE FOLLOWING ACTIONS:
            ACCESSING OR USING THE APPLICABLE SOFTWARE, YOU AGREE TO BE BOUND BY
            THE TERMS AND CONDITIONS.
          </p>
          <p>
            YOU REPRESENT AND WARRANT THAT YOU ARE 18 YEARS OLD OR OLDER AND
            HAVE THE RIGHT AND AUTHORITY TO ENTER AND COMPLY WITH THE TERMS AND
            CONDITIONS.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>What web3name is</h2>

          <p>
            A web3name is a string added to a DID on the KILT blockchain (i.e.
            to an on-chain DID). Web3names are unique, i.e. a web3name already
            added to one on-chain DID cannot be added to a second on-chain DID.
            Prerequisite for a web3name is an on-chain DID on the KILT
            blockchain that is created from your KILT identity.
          </p>
          <p>
            Claiming a web3name is done via the Sporran wallet (the “Sporran
            Software”) as supplied through the website{' '}
            <a href="https://www.sporran.org/" target="_blank" rel="noreferrer">
              https://www.sporran.org/
            </a>{' '}
            (the “Sporran Website) and is not subject of these Terms and
            Conditions.
          </p>
          <p>
            Please note that web3name is not connected to your KILT Identity but
            everyone who knows your on-chain DID can find out your web3name and
            vice versa. Using the w3n.id website, which acts like a phone book,
            for any given on-chain DID on the KILT blockchain you can look up
            the web3name and any credentials that are publicly linked to it.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>
            What the Link Addresses Website is
          </h2>

          <p>
            The Link Addresses Website acts as a guide to setting up a web3name
            and as an interface for linking your DID and web3name to any of your
            account addresses in the Polkadot ecosystem.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>
            How the Link Addresses Website works
          </h2>

          <p>
            You can claim your unique web3name by following the step-by-step
            instructions on the website.
          </p>
          <p>
            You may also link your on-chain DID, with your new web3name, to any
            accounts you have in the Polkadot ecosystem via the Link Addresses
            Website interface. In this way, people with your Polkadot ecosystem
            account address will be able to see your linked DID and web3 name
            and, vice versa, those with your web3name can see your public
            address.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>
            How linking your web3name to an account works
          </h2>

          <p>
            You can link your web3name to your Polkadot-ecosystem address using
            the interface on the Website by adding your DID and selecting both
            the account you wish to link to and the account you wish to pay the
            transaction fee from. This may but must not be the same account.
            Clicking “Link DID with account” will open the selected wallet/s to
            authorize linking on the DID and blockchain sides, and to authorize
            payment of the transaction fees.
          </p>
          <p>
            Then the link from your DID to your account address is submitted to
            the KILT blockchain and linked.
          </p>
          <p>
            More instructions on how to generate a paid on-chain DID and on
            claiming a web3name in Sporran (text and screenshots) are available
            on the Link Addresses Website.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>
            How other people check which web3name, on-chain DID and account are
            connected
          </h2>

          <p>
            As all Information on blockchains is public and immutable, any
            information stored on a blockchain can be checked by other people or
            services permanently.
          </p>
          <p>
            For example, w3n.id acts like such a phone book - check out their
            website and its current state to get an idea.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Your Commitments</h2>

          <p>
            You confirm that you are entitled for usage of the account, the
            on-chain DID and web3name you wish to link and that your usage of
            these do not violate the rights of third parties.
          </p>
          <p>
            You acknowledge that web3name is not a service of this site and you
            confirm to do your own research. Any and all information on the
            web3name is given to the best of our knowledge at the time of
            setting up the Website and is for informational and educational
            purposes only. we do not accept liability in regards to web3names or
            our information given about web3names.
          </p>
          <p>
            If you have linked an account with an on-chain DID/web3name that is
            no longer yours as you have actually lost, sold or otherwise
            relinquished it or suspect its fraudulent use, you will immediately
            terminate the use of it avoid giving the wrong impression to the
            public or third parties. You will also inform anyone who you know
            was relying on the linkage of the changes occurred or even warn
            them, in case you have ongoing relationships with them. We accept no
            liability in this respect.
          </p>
          <p>
            In your usage of on-chain DIDs and web3names in identifying another
            person or account, you will determine for your purpose if and to
            what extent you will trust – depending on your legal, business or
            other requirements – that they represent enough trust that these are
            coming from the right person/entity or if you need further documents
            of proof and which ones for example in regards to their identity. As
            these processes are defined outside of the Software, we accept no
            liability in this respect.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Liability</h2>

          <p>
            BTE is liable for damages that are based on an intentional or
            grossly negligent breach of duty by BTE, its legal representatives
            or various agents.
          </p>
          <p>
            In the event of a breach of essential contractual duties, BTE shall
            only be liable for the contractually typical, foreseeable damage if
            this was simply cause by negligence. Significant contractual
            obligations are those whose fulfilment enables the proper execution
            of the contract in the first place and whose compliance you can
            regularly rely on.
          </p>
          <p>
            The limitation of the two preceding paragraphs also apply to the
            legal representatives and various agents of BTE, if claims are
            asserted directly against them. The liability limitations resulting
            from the two preceding paragraphs do not apply insofar as BTE
            fraudulently concealed the defect or assumed a guarantee for the
            quality of DIDsign.
          </p>
          <p>
            Liability for culpable injury to life, limb and health and liability
            under Product Liability Act remain unaffected.
          </p>
          <p>Any additional claims for damages are excluded.</p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Risk Information</h2>

          <p>
            The following risk information contains a list of risks associated
            with the use of the web3name.trusted-entity.io Website for creating
            on-chain DIDs, and web3names and linking account addresses. The list
            is not exhaustive. It is not excluded that further unknown or
            unpredictable risks exist.
          </p>
          <p>
            Independent of the creation of on-chain DIDs and web3names but also
            to prevent others from using secret or personal data, please always
            keep the password and other access data to your devices, cloud
            solution and other data storage safe. Also, just like with any other
            private data, only send your DIDs and web3names or URLs to them to
            someone you trust that they respect your privacy and to someone who
            will not forward your personal data to anyone else or lose or
            publish it in any way detrimental to your privacy.
          </p>
          <p>
            On-chain DIDs and web3names are created and used via your wallet –
            please check all the information, instructions and warnings given
            about your wallet by its provider and closely follow the advice
            given. Always ensure that you do not lose your access data to your
            wallet and keep access to your wallet as well as the values,
            credentials, DIDs and the web3name stored in it safe from access by
            others.
          </p>
          <p>
            Your on-chain DID and web3name are typically written on the
            blockchain. Also, service endpoints used to provide additional
            information are outside of this web3name.trusted-entity.io Website
            and outside your wallet and its functionalities. Errors,
            dysfunctionalities, including failure of the KILT blockchain or the
            technical ecosystem in which it lives may adversely effect the
            creation or usage of your on-chain DID and/or web3name as well as
            the linkage to your accounts.
          </p>
          <p>
            Blockchains are public and do not forget - only write information on
            the blockchain that you feel fine about to be publicly and
            permanently recorded. Only link your on-chain DIDs and web3names to
            accounts that you publicly want to connect for anyone to see. Be
            aware that when an account is linked to a web3name, anyone with
            information on your web3name or on-chain DID can check out your
            accounts and vice versa. Be aware that this linkage might be visible
            permanently and that also the funds on such accounts as well as any
            linked information to it are publicly and permanently recorded.
          </p>
          <p>
            You acknowledge and agree that we have no support, service level, or
            other obligations like these hereunder. Furthermore, you acknowledge
            and agree that changes in the web3name.trusted-entity.io Website,
            the on-chain DID and/or web3name or their usage in the ecosystem
            will from time to time occur and that they might at some point of
            time not work and not be supported anymore.
          </p>
          <p>
            On-chain DIDs, web3names, the wallet used or other underlying
            software application may be the subject of hacking or other
            malicious interference by unauthorized third parties resulting in
            the loss, theft or other violation of data or change in the
            Software.
          </p>
          <p>
            Communication via internet-based systems is fundamentally
            susceptible to data/information being read out and possibly even
            changed. We have no influence on which processes (now and in the
            future) run in the background of the web browser or the wallet used.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>
            Right to Change the Software, the Website and these Terms and
            Conditions
          </h2>

          <p>
            BTE reserves the right to change the Software, the Website and these
            Terms and Conditions as well as the commercial and non-commercial
            conditions for its usage.
          </p>
          <p>
            Such changes will be made via uploading new or changed Terms and
            Conditions, Software, and/or other information to the Website and
            any usage of the Website will from that time on fall under these new
            Terms and Conditions, will be handled by the new version of the
            Website and will be for the commercial and non-commercial usage.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>License to the Website </h2>

          <p>
            Copyright (c) 2021-2022, B.T.E. BOTLabs Trusted Entity GmbH. All
            rights reserved.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>License to the Software</h2>

          <p>Copyright (c) 2022, built on KILT. All rights reserved.</p>

          <p>
            Redistribution and use in source and binary forms, with or without
            modification, are permitted provided that the following conditions
            are met:
          </p>
          <ul>
            <li>
              Redistributions of source code must retain the above copyright
              notice, this list of conditions and the following disclaimer.
            </li>
            <li>
              Redistributions in binary form must reproduce the above copyright
              notice, this list of conditions and the following disclaimer in
              the documentation and/or other materials provided with the
              distribution.
            </li>
            <li>
              All advertising materials mentioning features or use of this
              software must display the following acknowledgement: This product
              is built on KILT.
            </li>
            <li>
              Neither the name of KILT nor the names of its contributors may be
              used to endorse or promote products derived from this software
              without specific prior written permission.
            </li>
          </ul>

          <p>
            Disclaimer: The Liability of the B.T.E. BOTLabs Trusted Entity GmbH
            (hereinafter referred to as “BTE”) is limited according to these
            Terms and Conditions for DIDsign as provided under
            https://didsign.io/.
          </p>

          <p>(BSD 4-Clause)</p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Miscellaneous</h2>

          <p>
            These Terms and Conditions and the entire legal relationship between
            the parties shall be governed by the laws of the Federal Republic of
            Germany to the exclusion of the UN Convention on Contracts for the
            International Sale of Goods (CISG) unless the choice of law is
            legally prohibited.
          </p>
          <p>
            If one or more terms of these Terms and Conditions are found to be
            invalid or unenforceable, the remaining provisions will continue in
            full force and effect.
          </p>
          <p>
            The place of performance and exclusive place of jurisdiction for all
            disputes arising from these Terms and Conditions and the entire
            legal relationship between the parties shall be BTE’s registered
            office, unless choice of jurisdiction is legally prohibited.
          </p>
          <p>Requirements according to § 5 TMG (Germany)</p>
        </section>
      </div>
    </main>
  );
};
