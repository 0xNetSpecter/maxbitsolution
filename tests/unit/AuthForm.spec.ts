import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import AuthForm from "@/components/auth/AuthForm.vue";

describe("AuthForm.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  const defaultProps = {
    mode: "register" as const,
    errorMessage: "",
    loading: false,
    username: "",
    password: "",
  };

  beforeEach(() => {
    wrapper = mount(AuthForm, {
      props: defaultProps,
      global: {
        stubs: {
          Transition: true,
        },
      },
    });
  });

  it("renders essential form fields", () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("emits submit event when the form is submitted", async () => {
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.emitted("submit")).toBeTruthy();
  });

  it("displays an error message when provided", async () => {
    await wrapper.setProps({ errorMessage: "Authentication failed" });
    expect(wrapper.text()).toContain("Authentication failed");
  });

  it("disables submit button while loading", async () => {
    await wrapper.setProps({ loading: true });
    const button = wrapper.find('button[type="submit"]');
    expect(button.attributes("disabled")).toBeDefined();
  });
});
