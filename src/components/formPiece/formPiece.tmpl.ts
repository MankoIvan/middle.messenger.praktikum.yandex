const formPieceTmpl = `
    <div class="form-piece">
        <label class="form-piece__label" for={{name}}>{{label}}</label>
        <input class="form-piece__input" id={{name}} name={{name}} type={{type}} value={{value}}>
        <div class="form-piece__error-placeholder">
            <p id={{addSelector}}{{name}}ErrMessage class="form-piece__error">{{message}}</p>
        </div>
    </div>
`;
export {formPieceTmpl};
