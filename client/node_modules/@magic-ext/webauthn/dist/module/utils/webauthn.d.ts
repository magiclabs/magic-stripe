export function transformNewAssertionForServer(newAssertion: PublicKeyCredential): {
    id: string;
    rawId: string;
    type: string;
    attObj: string;
    clientData: string;
    registrationClientExtensions: string;
};
export function transformAssertionForServer(newAssertion: PublicKeyCredential): {
    id: string;
    rawId: string;
    type: string;
    authData: string;
    clientData: string;
    signature: string;
    assertionClientExtensions: string;
};
