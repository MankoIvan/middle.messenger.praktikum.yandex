const authorizeTmpl = `
    <div class="form">
        <h1 class="form__title">Вход</h1>
        <form name=authorizeForm class="form__container">
            {{{loginInput}}}
            {{{passwordInput}}}
        </form>
        <div class="form__buttons">
            {{{authAuthorizeButton}}}
            {{{authRegisterButton}}}
        </div>
    </div>
`;
export {authorizeTmpl};
