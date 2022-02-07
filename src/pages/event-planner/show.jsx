import { setDoc } from "firebase/firestore";
import { debounce, join } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading";
import { SectionRow } from "../../components/section-row";
import { useFirebaseDocument } from "../../firebase/hooks";

const VARIABLE_REGEX = /:[_a-zA-Z][_a-zA-Z0-9]{0,30}/g

function matchVariables(input) {
  return (`${input}`.match(VARIABLE_REGEX) || [])
    .filter((x, i, a) => a.indexOf(x) === i)
    .map(x => x.replace(/:/, ""));
}

function titlizeVariableName(input) {
  return `${input}`.replace('_', ' ').replace(/(^| )[a-z]/g, x => x.toUpperCase())
}

export function Show() {
  const { id } = useParams();
  const [template, loading, error] = useFirebaseDocument("public/event_planner/templates", id);

  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      title: '',
      body: ''
    }
  });

  const [discoveredVariables, setDiscoveredVariables] = useState([])

  const [variableValues, setVariableValues] = useState({})
  const mergeVariableValues = useCallback((values) => {
    setVariableValues(prev => ({ ...prev, ...values }))
  }, [])

  useEffect(() => {
    if (!template || !template.exists()) return;

    setValue('title', template.data().title)
    setValue('body', template.data().body)

  }, [JSON.stringify(template)])

  useEffect(() => {
    setVariableValues(
      o => discoveredVariables.reduce(
        (acc, variable) => ({ ...acc, [variable]: o[variable] }),
        {}
      )
    )
  }, [discoveredVariables])

  const updateDiscoveredVariables = useCallback(debounce((e) => {
    setDiscoveredVariables(
      matchVariables(e.target.value)
    )
  }, 200), [])

  const onSubmit = useCallback((data) => {
    setDoc(template.ref, data)
  }, [template])

  if (loading) return <Loading />

  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <SectionRow title="Template" description="The template for generating the content with its content and variables">
        <div className="space-y-2">
          <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="p-2 flex justify-end">
                <div className="">
                  <button
                    className="bg-blue-500 px-5 rounded-lg py-2 
                  font-bold uppercase text-white
                  text-sm
                  transition-colors
                  hover:bg-blue-600
                  disabled:ring-0
                  outline-none focus:ring active:focus:ring-blue-500">Save</button>
                </div>
              </div>
              <fieldset className="space-y-2">
                <div>
                  <label htmlFor="title" className="font-bold text-sm p-2">
                    Title
                  </label>
                  <div className="py-1">
                    <input required {...register("title")} id="title"
                      type="text"
                      className="form-input rounded-lg w-full" />
                  </div>
                </div>
                <div>
                  <label htmlFor="body" className="font-bold text-sm p-2">
                    Body
                  </label>
                  <div className="py-1">
                    <textarea required {...register("body")} id="body"
                      onInput={updateDiscoveredVariables}
                      rows={10}
                      name="body" type="text"
                      placeholder="New post ..."
                      className="form-input rounded-lg w-full" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-sm p-2">Discovered Variables</div>
                  <div>{!discoveredVariables.length && "No variables"}</div>
                  <div >
                    {discoveredVariables &&
                      discoveredVariables
                        .map((variable) => (<>
                          <code className="p-1 ml-1 font-bold">{variable}</code>
                          <span className="last:hidden">,</span>
                        </>))}
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </SectionRow>
      <SectionRow title="Variables" description="The variables values to be evaluated with the templates">
        <div className="space-y-2">
          <VariablesInputs variables={variableValues} onChange={mergeVariableValues} />
        </div>
      </SectionRow>
      <SectionRow title="Results" description="The output of the templates when tested against the variables">
        <div className="space-y-2">
          <TemplateResults template={getValues('body')} variables={variableValues} />
        </div>
      </SectionRow>
    </div>
  )
}

function VariablesInputs({ variables = {}, onChange }) {
  const handleFormInput = useCallback((e) => {
    onChange({ [e.target.name]: e.target.value })
  }, [])

  return (
    <div className="min-h-[10rem]">
      <form className="space-y-2" action="">
        {!Object.keys(variables).length && <div className="text-sm">No variables found</div>}
        {Object.entries(variables).map(([variable, value], i) => (
          <div key={`${variable}_variable`}>
            <label htmlFor={`${variable}_variable`} className="font-bold text-sm p-2">
              {titlizeVariableName(variable)}
            </label>
            <div className="py-1">
              <input required id={`${variable}_variable`}
                name={variable}
                type="text"
                value={value || ""}
                onChange={handleFormInput}
                className="form-input rounded-lg w-full" />
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}

function TemplateResults({ template = '', variables = {} }) {
  const output = useMemo(() => {
    return template.replace(VARIABLE_REGEX, match => variables[match.replace(/:/, "")] || match)
  }, [template, variables])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output);
  }, [output])

  return (
    <div>
      <label htmlFor="output" className="font-bold text-sm p-2">
        Output
      </label>
      <div className="py-1 relative">
        <textarea readOnly
          rows={10}
          id="output"
          value={output}
          className="form-input rounded-lg w-full" />
        <div className="absolute right-3 bottom-5">
          <button
            onClick={handleCopy}
            className="bg-gray-300 rounded-full p-1 opacity-75 transition-colors active:bg-gray-400 hover:bg-gray-200">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.55556 8.44444V17.3333C9.55556 18.5606 10.5505 19.5556 11.7778 19.5556H18.4444M9.55556 8.44444V6.22222C9.55556 4.99492 10.5505 4 11.7778 4H16.8731C17.1678 4 17.4504 4.11706 17.6588 4.32544L22.5635 9.23012C22.7718 9.43849 22.8889 9.72111 22.8889 10.0158V17.3333C22.8889 18.5606 21.894 19.5556 20.6667 19.5556H18.4444M9.55556 8.44444H7.11111C6.00655 8.44444 5.11111 9.33987 5.11111 10.4444V21.7778C5.11111 23.0051 6.10604 24 7.33334 24H16.4444C17.549 24 18.4444 23.1046 18.4444 22V19.5556" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
