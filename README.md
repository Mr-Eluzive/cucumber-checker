### cucumber-checker
This tool can help you ensure that every step has written in Cucumber does have own definition in step-definitions.

## run
```shell
.\run.cmd <path_to_feature_file>
```

## example
```
| cucumber-checker
| - run.cmd
| project
| - e2e
| -- features
|  --- sample.feature
|  --- forms
|  ------ forms.feature
| -- step-definitions
|  --- shared.steps.ts
|  --- forms.steps.ts
```

```shell
.\run.cmd sample.feature
.\run.cmd forms/forms.feature
```
