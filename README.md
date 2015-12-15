# alert-drawer
![codeship](https://codeship.com/projects/3474d010-850d-0133-cc52-3ac20bd54ece/status?branch=master)

A simple AngularJS (1.x) module for displaying alerts.

`alert-drawer` listens for events `$emit`ed on the `$rootScope`, and slides in an alert from the top.

### Usage
After including the css, template, and js, add the directive in your html. We recommend including it in a base template, so all your views have access to it.
```
<alert-drawer></alert-drawer>
```

Then, just `$emit` an event on the `$rootScope`:
```
$rootScope.$emit('alert.danger', 'uh oh! Something happened!');
```

The different alerts are:
- `alert.info`
- `alert.processing`
- `alert.warning`
- `alert.danger`

### dependencies
- angular (1.x)
- jquery
- font-awesome

### Tests
Make sure to install test dependencies (`npm install` and `bower install`). Then run `grunt karma`.
