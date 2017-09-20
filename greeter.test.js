expect.extend({
    toHaveBeenCalledWithSome: function (received, argument) {
        var a = received.calls.allArgs()[0][0];
        argument(a);
        return {
            message: function () { return ""; },
            pass: true
        };
    }
});
var greeter = {
    welcome: function (name) {
        var action = {
            message: "Hi " + name
        };
        console.log(action);
    }
};
describe("greeter", function () {
    it("'welcome' creates action with welcome message", function () {
        spyOn(console, "log");
        var name = "John";
        greeter.welcome(name);
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWithSome(function (action) {
            expect(action).toBeTruthy();
            expect(action.message).toContain("Welcome");
            expect(action.message).toContain(name);
            expect(action.message).toBe("Welcome " + name);
        });
    });
});
